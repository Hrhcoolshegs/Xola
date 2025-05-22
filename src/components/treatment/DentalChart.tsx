import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tooth, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ToothData {
  id: string;
  position: [number, number, number];
  condition: 'healthy' | 'cavity' | 'treated' | 'missing';
  notes?: string;
}

interface DentalChartProps {
  data: ToothData[];
  onToothSelect: (toothId: string) => void;
  selectedTooth?: string;
}

export const DentalChart = ({ data, onToothSelect, selectedTooth }: DentalChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(() => new THREE.PerspectiveCamera(75, 1, 0.1, 1000));
  const [renderer] = useState(() => new THREE.WebGLRenderer({ antialias: true }));
  const [controls, setControls] = useState<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    // Camera
    camera.position.z = 5;

    // Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    setControls(orbitControls);

    // Add teeth
    data.forEach((tooth) => {
      const geometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
      const material = new THREE.MeshPhongMaterial({
        color: tooth.condition === 'healthy' ? 0xffffff :
               tooth.condition === 'cavity' ? 0xff0000 :
               tooth.condition === 'treated' ? 0x00ff00 : 0x808080
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...tooth.position);
      mesh.userData.toothId = tooth.id;
      scene.add(mesh);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  const handleReset = () => {
    if (controls) {
      controls.reset();
    }
  };

  const handleZoom = (factor: number) => {
    if (controls) {
      controls.dollyIn(factor);
      controls.update();
    }
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="w-full aspect-square rounded-lg border border-gray-200 overflow-hidden"
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          icon={<ZoomIn size={16} />}
          onClick={() => handleZoom(1.2)}
        />
        <Button
          variant="outline"
          size="sm"
          icon={<ZoomOut size={16} />}
          onClick={() => handleZoom(0.8)}
        />
        <Button
          variant="outline"
          size="sm"
          icon={<RotateCcw size={16} />}
          onClick={handleReset}
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tooth size={20} className="text-[#0073b9]" />
            <span className="font-medium">Selected: {selectedTooth || 'None'}</span>
          </div>
          <div className="flex space-x-2">
            <Badge variant="success">Healthy</Badge>
            <Badge variant="danger">Cavity</Badge>
            <Badge variant="primary">Treated</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};