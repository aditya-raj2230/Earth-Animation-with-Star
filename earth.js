    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2; // Set initial camera position

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const waterTexture = textureLoader.load('/water.jpg'); // Update with your texture path
    waterTexture.wrapS = THREE.RepeatWrapping; // Repeat texture horizontally
    waterTexture.wrapT = THREE.RepeatWrapping; // Repeat texture vertically

    // Load landmass texture
    const landTextureLoader = new THREE.TextureLoader();
    const landTexture = landTextureLoader.load('/bg.png'); // Update with your landmass texture path

    // Create sphere geometry and material with water texture
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const waterMaterial = new THREE.MeshBasicMaterial({ map: waterTexture });
    const waterSphere = new THREE.Mesh(geometry, waterMaterial);
    scene.add(waterSphere); // Add water sphere to the scene

    // Create landmass sphere with land texture
    const landMaterial = new THREE.MeshStandardMaterial({ 
        map: landTexture, 
        transparent: true, // Enable transparency
        opacity: 1.0, // Set opacity to fully opaque
        depthWrite: true // Enable depth writing
    });
    const landSphere = new THREE.Mesh(geometry, landMaterial);
    landSphere.scale.set(1.01, 1.01, 1.01); // Slightly scale up to sit on top of the water sphere
    scene.add(landSphere); // Add land sphere to the scene

    // Zoom functionality
    window.addEventListener('wheel', (event) => {
        camera.position.z += event.deltaY * 0.01; // Adjust zoom speed
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update texture offset for a patchy ripple effect
        const time = Date.now() * 0.001; // Get current time
        waterTexture.offset.x = Math.sin(time) * 0.01; // Horizontal ripple effect
        waterTexture.offset.y = Math.cos(time) * 0.01; // Vertical ripple effect

        renderer.render(scene, camera);
    }
    animate();