"use client";
// Global Components
import { MainModule } from "@/components/customized";

export function DashboardScreen() {
  return (
    <MainModule
      moduleTitle={"panel de control"}
      children={
        <section className="space-y-4 p-4">
          <p>Bienvenidos al panel de control</p>
        </section>
      }
    />
  );
}
