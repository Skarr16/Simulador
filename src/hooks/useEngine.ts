import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { SimulationConfig, SimulationState, PhysicsObject, Environment } from '../types';
import { OBJECTS, ENVIRONMENTS } from '../lib/constants';

export function useEngine(config: SimulationConfig, customObjects?: Record<string, PhysicsObject>, customEnvs?: Record<string, Environment>, speedMultiplier: number = 1) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [time, setTime] = useState(0);
  const [manualParachuteTime, setManualParachuteTime] = useState<number | null>(null);
  
  const currentObjects = customObjects || OBJECTS;
  const currentEnvs = customEnvs || ENVIRONMENTS;

  const objectA = currentObjects[config.objectAId];
  const objectB = currentObjects[config.objectBId];
  const env = currentEnvs[config.environmentId];

  // Pre-compute the simulation trajectory
  const simulationData = useMemo(() => {
    let t = 0;
    const dt = 0.02; // 20ms step for physics integration
    let yA = config.height;
    let vA = 0;
    let yB = config.height;
    let vB = 0;
    
    const data: SimulationState[] = [];
    
    // Safety break at 1200s
    while ((yA > 0 || yB > 0) && t < 1200) {
      let currentAreaA = objectA.area;
      let currentCdA = objectA.cd;
      let currentAreaB = objectB.area;
      let currentCdB = objectB.cd;

      let parachuteDeployedA = false;
      let parachuteDeployedB = false;

      if (config.simulationMode === 'paraquedas') {
        const shouldDeploy = manualParachuteTime !== null && t >= manualParachuteTime;
        if (shouldDeploy && objectA.id === 'skydiver') {
          currentAreaA = objectA.parachuteArea !== undefined ? objectA.parachuteArea : objectA.area + 5;
          currentCdA = objectA.parachuteCd !== undefined ? objectA.parachuteCd : 1.75;
          parachuteDeployedA = true;
        }
        if (shouldDeploy && objectB.id === 'skydiver') {
          currentAreaB = objectB.parachuteArea !== undefined ? objectB.parachuteArea : objectB.area + 5;
          currentCdB = objectB.parachuteCd !== undefined ? objectB.parachuteCd : 1.75;
          parachuteDeployedB = true;
        }
      }

      let FdA = 0;
      if (config.enableAirResistance && yA > 0) {
        FdA = 0.5 * env.rho * vA * vA * currentCdA * currentAreaA;
      }
      let aA = env.g - (FdA / objectA.mass);
      if (yA <= 0) {
        aA = 0; vA = 0; yA = 0; FdA = 0;
      }
      
      let FdB = 0;
      if (config.enableAirResistance && yB > 0) {
        FdB = 0.5 * env.rho * vB * vB * currentCdB * currentAreaB;
      }
      let aB = env.g - (FdB / objectB.mass);
      if (yB <= 0) {
        aB = 0; vB = 0; yB = 0; FdB = 0;
      }
      
      data.push({
        t, yA, vA, aA, FdA, yB, vB, aB, FdB, parachuteDeployedA, parachuteDeployedB
      });
      
      if (yA > 0) {
        vA += aA * dt;
        yA -= vA * dt;
      }
      if (yB > 0) {
        vB += aB * dt;
        yB -= vB * dt;
      }
      t += dt;
    }
    
    // push final state exactly at 0
    data.push({
      t, yA: 0, vA: 0, aA: 0, FdA: 0, yB: 0, vB: 0, aB: 0, FdB: 0, parachuteDeployedA: config.simulationMode === 'paraquedas', parachuteDeployedB: config.simulationMode === 'paraquedas'
    });
    
    return data;
  }, [config, objectA, objectB, env, manualParachuteTime]);

  const [currentState, setCurrentState] = useState<SimulationState>(simulationData[0]);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    let timeScale = config.simulationMode === 'paraquedas' ? 10 : 1;
    timeScale *= speedMultiplier;
    if (!startTimeRef.current) startTimeRef.current = timestamp - ((time * 1000) / timeScale);
    const elapsed = ((timestamp - startTimeRef.current) / 1000) * timeScale;
    
    setTime(elapsed);
    
    let frameIndex = Math.floor(elapsed / 0.02);
    
    if (frameIndex >= simulationData.length - 1) {
      frameIndex = simulationData.length - 1;
      setIsRunning(false);
      setIsFinished(true);
    }
    
    setCurrentState(simulationData[frameIndex]);
    
    if (frameIndex < simulationData.length - 1 && isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [simulationData, time, isRunning, speedMultiplier, config.simulationMode]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, animate]);

  useEffect(() => {
    startTimeRef.current = null;
  }, [speedMultiplier, config.simulationMode]);

  const start = () => {
    if (!isRunning) {
      if (isFinished) {
        // If finished, reset then start
        setIsFinished(false);
        setTime(0);
        setCurrentState(simulationData[0]);
        startTimeRef.current = null;
      }
      setIsRunning(true);
    }
  };

  const pause = () => setIsRunning(false);
  const deployParachute = () => {
    if (manualParachuteTime === null) {
      setManualParachuteTime(time);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    setResetCount(c => c + 1);
    startTimeRef.current = null;
    setManualParachuteTime(null);
    setCurrentState(simulationData[0]);
  };

  // Reset when config changes
  useEffect(() => {
    reset();
  }, [config, objectA, objectB, env]);

  // Derived Values
  const kA = 0.5 * objectA.mass * currentState.vA * currentState.vA;
  const uA = objectA.mass * env.g * currentState.yA;
  const kB = 0.5 * objectB.mass * currentState.vB * currentState.vB;
  const uB = objectB.mass * env.g * currentState.yB;

  // Filter data points dynamically to generate graphs progressively during the fall
  const currentDataPoints = useMemo(() => {
    if (isFinished) return simulationData;
    const filtered = simulationData.filter((d) => d.t <= time);
    if (filtered.length === 0 && simulationData.length > 0) {
      return [simulationData[0]];
    }
    return filtered;
  }, [simulationData, time, isFinished]);

  return {
    start,
    pause,
    deployParachute,
    reset,
    isRunning,
    isFinished,
    resetCount,
    time,
    currentState,
    dataPoints: currentDataPoints, // For charts
    objectA,
    objectB,
    env,
    kA, uA, kB, uB
  };
}
