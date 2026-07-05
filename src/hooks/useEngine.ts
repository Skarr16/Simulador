import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { SimulationConfig, SimulationState } from '../types';
import { OBJECTS, ENVIRONMENTS } from '../lib/constants';

export function useEngine(config: SimulationConfig) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
  
  const objectA = OBJECTS[config.objectAId];
  const objectB = OBJECTS[config.objectBId];
  const env = ENVIRONMENTS[config.environmentId];

  // Pre-compute the simulation trajectory
  const simulationData = useMemo(() => {
    let t = 0;
    const dt = 0.01; // 10ms step for physics integration
    let yA = config.height;
    let vA = 0;
    let yB = config.height;
    let vB = 0;
    
    const data: SimulationState[] = [];
    
    // Safety break at 120s
    while ((yA > 0 || yB > 0) && t < 120) {
      let FdA = 0;
      if (config.enableAirResistance && yA > 0) {
        FdA = 0.5 * env.rho * vA * vA * objectA.cd * objectA.area;
      }
      let aA = env.g - (FdA / objectA.mass);
      if (yA <= 0) {
        aA = 0; vA = 0; yA = 0; FdA = 0;
      }
      
      let FdB = 0;
      if (config.enableAirResistance && yB > 0) {
        FdB = 0.5 * env.rho * vB * vB * objectB.cd * objectB.area;
      }
      let aB = env.g - (FdB / objectB.mass);
      if (yB <= 0) {
        aB = 0; vB = 0; yB = 0; FdB = 0;
      }
      
      data.push({
        t, yA, vA, aA, FdA, yB, vB, aB, FdB
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
      t, yA: 0, vA: 0, aA: 0, FdA: 0, yB: 0, vB: 0, aB: 0, FdB: 0
    });
    
    return data;
  }, [config, objectA, objectB, env]);

  const [currentState, setCurrentState] = useState<SimulationState>(simulationData[0]);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp - (time * 1000);
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    
    setTime(elapsed);
    
    let frameIndex = Math.floor(elapsed / 0.01);
    
    if (frameIndex >= simulationData.length - 1) {
      frameIndex = simulationData.length - 1;
      setIsRunning(false);
      setIsFinished(true);
    }
    
    setCurrentState(simulationData[frameIndex]);
    
    if (frameIndex < simulationData.length - 1 && isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [simulationData, time, isRunning]);

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

  const reset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    startTimeRef.current = null;
    setCurrentState(simulationData[0]);
  };

  // Reset when config changes
  useEffect(() => {
    reset();
  }, [simulationData]);

  // Derived Values
  const kA = 0.5 * objectA.mass * currentState.vA * currentState.vA;
  const uA = objectA.mass * env.g * currentState.yA;
  const kB = 0.5 * objectB.mass * currentState.vB * currentState.vB;
  const uB = objectB.mass * env.g * currentState.yB;

  return {
    start,
    pause,
    reset,
    isRunning,
    isFinished,
    time,
    currentState,
    dataPoints: simulationData, // For charts
    objectA,
    objectB,
    env,
    kA, uA, kB, uB
  };
}
