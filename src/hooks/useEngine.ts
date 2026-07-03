import { useState, useRef, useCallback, useEffect } from 'react';
import { SimulationConfig, DataPoint } from '../types';
import { calculateFallTime, calculateVelocity, calculatePosition, calculateKineticEnergy, calculatePotentialEnergy } from '../lib/utils';

export function useEngine(config: SimulationConfig) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  
  // Real-time derived state
  const y = calculatePosition(config.height, time);
  const v = calculateVelocity(time);
  const kA = calculateKineticEnergy(config.massA, v);
  const kB = calculateKineticEnergy(config.massB, v);
  const uA = calculatePotentialEnergy(config.massA, y);
  const uB = calculatePotentialEnergy(config.massB, y);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const maxFallTime = calculateFallTime(config.height);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp - time * 1000;
    }

    const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;

    if (elapsedSeconds >= maxFallTime) {
      // Finish
      setTime(maxFallTime);
      setIsRunning(false);
      setIsFinished(true);
      
      // Add final data point if not exactly there
      setDataPoints(prev => {
        const finalPoint = {
          time: maxFallTime,
          y: 0,
          v: calculateVelocity(maxFallTime),
          k_A: calculateKineticEnergy(config.massA, calculateVelocity(maxFallTime)),
          k_B: calculateKineticEnergy(config.massB, calculateVelocity(maxFallTime)),
          u_A: 0,
          u_B: 0,
        };
        return [...prev, finalPoint];
      });
      return;
    }

    setTime(elapsedSeconds);
    
    // Sample data for charts (approx every 0.1s to avoid huge arrays)
    if (Math.floor(elapsedSeconds * 10) > Math.floor(time * 10)) {
        setDataPoints(prev => [
            ...prev,
            {
                time: elapsedSeconds,
                y: calculatePosition(config.height, elapsedSeconds),
                v: calculateVelocity(elapsedSeconds),
                k_A: calculateKineticEnergy(config.massA, calculateVelocity(elapsedSeconds)),
                k_B: calculateKineticEnergy(config.massB, calculateVelocity(elapsedSeconds)),
                u_A: calculatePotentialEnergy(config.massA, calculatePosition(config.height, elapsedSeconds)),
                u_B: calculatePotentialEnergy(config.massB, calculatePosition(config.height, elapsedSeconds))
            }
        ]);
    }

    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [config, maxFallTime, time, isRunning]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, animate]);

  const start = useCallback(() => {
    if (isFinished) reset();
    setIsRunning(true);
    startTimeRef.current = undefined;
  }, [isFinished]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    setDataPoints([{
        time: 0,
        y: config.height,
        v: 0,
        k_A: 0,
        k_B: 0,
        u_A: calculatePotentialEnergy(config.massA, config.height),
        u_B: calculatePotentialEnergy(config.massB, config.height)
    }]);
    startTimeRef.current = undefined;
  }, [config]);

  // Reset when config changes significantly
  useEffect(() => {
    reset();
  }, [config.height, config.massA, config.massB]);

  return {
    time,
    y,
    v,
    kA,
    kB,
    uA,
    uB,
    isRunning,
    isFinished,
    dataPoints,
    start,
    pause,
    reset,
  };
}
