"use client";

import { useEffect, useRef } from "react";

export default function IdleTimer() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTime = 1 * 60 * 1000; // 5 menit dalam ms

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      alert("Kamu tidak aktif selama 5 menit!");
      // Di sini bisa redirect, logout, atau lainnya
    }, idleTime);
  };

  useEffect(() => {
    // Daftar event yang dianggap sebagai aktivitas
    const events = ["mousemove", "keydown", "scroll", "click"];

    // Setiap event, panggil resetTimer
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // jalankan pertama kali saat komponen mount

    return () => {
      // Cleanup: hapus event listener dan timer
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return null; // Komponen ini tidak perlu menampilkan apapun
}
