import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const G = 9.81; // m/s^2

export function calculateFallTime(height: number): number {
  return Math.sqrt((2 * height) / G);
}

export function calculateVelocity(time: number): number {
  return G * time;
}

export function calculatePosition(height: number, time: number): number {
  const y = height - 0.5 * G * Math.pow(time, 2);
  return Math.max(0, y);
}

export function calculateKineticEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * Math.pow(velocity, 2);
}

export function calculatePotentialEnergy(mass: number, height: number): number {
  return mass * G * height;
}
