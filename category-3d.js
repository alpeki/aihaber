// 3D Category Animations using Three.js

function initCategory3D() {
    // AI Category - Neural Network
    initAIAnimation();
    
    // Technology Category - Circuit Board
    initTechAnimation();
    
    // Robotics Category - Rotating Gears
    initRoboticsAnimation();
    
    // Science Category - DNA Helix
    initScienceAnimation();
}

// AI - Neural Network Animation
function initAIAnimation() {
    const canvas = document.getElementById('ai-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    
    // Create neural network nodes
    const nodes = [];
    const connections = [];
    const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6A00 });
    
    // Create 3 layers of nodes
    for (let layer = 0; layer < 3; layer++) {
        const nodesInLayer = layer === 1 ? 5 : 3;
        for (let i = 0; i < nodesInLayer; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.x = (layer - 1) * 2;
            node.position.y = (i - (nodesInLayer - 1) / 2) * 0.8;
            scene.add(node);
            nodes.push(node);
        }
    }
    
    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF8E53, transparent: true, opacity: 0.3 });
    for (let i = 0; i < nodes.length - 3; i++) {
        const points = [nodes[i].position, nodes[i + 3].position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
        connections.push(line);
    }
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate scene
        scene.rotation.y += 0.005;
        
        // Pulse nodes
        nodes.forEach((node, i) => {
            node.scale.setScalar(1 + Math.sin(Date.now() * 0.002 + i) * 0.2);
        });
        
        renderer.render(scene, camera);
    }
    animate();
}

// Technology - Circuit Board Animation
function initTechAnimation() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    
    // Create circuit lines
    const group = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF6A00 });
    
    for (let i = 0; i < 8; i++) {
        const points = [];
        const angle = (i / 8) * Math.PI * 2;
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(Math.cos(angle) * 2, Math.sin(angle) * 2, 0));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
        
        // Add nodes at endpoints
        const nodeGeometry = new THREE.CircleGeometry(0.15, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF8E53 });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
        group.add(node);
    }
    
    scene.add(group);
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Robotics - Rotating Gears Animation
function initRoboticsAnimation() {
    const canvas = document.getElementById('robotics-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    
    // Create gear shape
    function createGear(radius, teeth, innerRadius) {
        const shape = new THREE.Shape();
        const toothAngle = (Math.PI * 2) / teeth;
        
        for (let i = 0; i < teeth; i++) {
            const angle = i * toothAngle;
            const nextAngle = (i + 1) * toothAngle;
            
            if (i === 0) {
                shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            } else {
                shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            
            shape.lineTo(Math.cos(angle + toothAngle * 0.4) * (radius + 0.2), Math.sin(angle + toothAngle * 0.4) * (radius + 0.2));
            shape.lineTo(Math.cos(angle + toothAngle * 0.6) * (radius + 0.2), Math.sin(angle + toothAngle * 0.6) * (radius + 0.2));
            shape.lineTo(Math.cos(nextAngle) * radius, Math.sin(nextAngle) * radius);
        }
        
        const hole = new THREE.Path();
        hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        
        const geometry = new THREE.ShapeGeometry(shape);
        return geometry;
    }
    
    const gearGeometry = createGear(1.2, 12, 0.4);
    const gearMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6A00, side: THREE.DoubleSide });
    const gear1 = new THREE.Mesh(gearGeometry, gearMaterial);
    
    const smallGearGeometry = createGear(0.8, 8, 0.3);
    const gear2 = new THREE.Mesh(smallGearGeometry, gearMaterial);
    gear2.position.set(1.5, 1.5, 0);
    
    scene.add(gear1);
    scene.add(gear2);
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        gear1.rotation.z += 0.02;
        gear2.rotation.z -= 0.03;
        renderer.render(scene, camera);
    }
    animate();
}

// Science - DNA Helix Animation
function initScienceAnimation() {
    const canvas = document.getElementById('science-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    
    const group = new THREE.Group();
    
    // Create DNA helix
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xFF6A00 });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xFF8E53 });
    
    const segments = 20;
    const radius = 0.8;
    const height = 4;
    
    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const angle = t * Math.PI * 4;
        const y = (t - 0.5) * height;
        
        // First strand
        const sphere1 = new THREE.Mesh(sphereGeometry, material1);
        sphere1.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        group.add(sphere1);
        
        // Second strand (opposite)
        const sphere2 = new THREE.Mesh(sphereGeometry, material2);
        sphere2.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
        group.add(sphere2);
        
        // Connecting line
        if (i % 2 === 0) {
            const points = [sphere1.position.clone(), sphere2.position.clone()];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.3 });
            const line = new THREE.Line(geometry, lineMaterial);
            group.add(line);
        }
    }
    
    scene.add(group);
    camera.position.z = 5;
    camera.position.y = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategory3D);
} else {
    initCategory3D();
}
