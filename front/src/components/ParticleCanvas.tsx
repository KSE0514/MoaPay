import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Styled-components for canvas container
const CanvasContainer = styled.div`
  position: absolute;
  z-index: 0;
  top: -100px;
  width: 100vw;
  height: 100vh;

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: any[] = [];
    const numberOfParticles = 150;
    let animationId: number;

    // Particle class (자연스러운 직사각형 모양)
    class Particle {
      x: number;
      y: number;
      width: number;
      height: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;

      constructor() {
        this.x = Math.random() * canvas.width; // x좌표는 무작위
        this.y = Math.random() * canvas.height; // y좌표는 무작위로 시작
        this.width = Math.random() * 15 + 2; // 너비
        this.height = Math.random() * 10 + 2; // 높이
        this.speedX = Math.random() * 2 - 1; // 좌우로 약간의 이동
        this.speedY = Math.random() * 2 + 1; // 아래로 떨어지는 속도
        this.color = Math.random() > 0.5 ? "#ffffff94" : "#c61aed7e"; // 색상은 하얀색 또는 보라색
        this.angle = Math.random() * 360; // 회전 각도
      }

      update() {
        this.x += this.speedX; // 좌우 이동
        this.y += this.speedY; // 아래로 떨어짐

        // 파티클이 화면 하단에 도달하면 상단으로 리셋
        if (this.y > canvas.height) {
          this.y = -this.height; // 화면 상단 위로 리셋
          this.x = Math.random() * canvas.width; // 새로운 x 위치
        }

        this.angle += 2; // 회전 속도
      }

      draw() {
        ctx.save(); // 현재 상태 저장
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // 파티클 중심 이동
        ctx.rotate((this.angle * Math.PI) / 180); // 각도 회전
        ctx.fillStyle = this.color;
        ctx.fillRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        ); // 네모(직사각형) 그리기
        ctx.restore(); // 이전 상태 복원
      }
    }

    // Initialize particles
    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // Resize canvas
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    return () => {
      window.removeEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      cancelAnimationFrame(animationId); // 클린업 시 애니메이션 중지
    };
  }, []);

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

export default ParticleCanvas;
