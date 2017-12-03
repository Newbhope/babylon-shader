if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");

    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        var meshes = [];
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);

        camera.attachControl(canvas, false);
        camera.lowerRadiusLimit = 1;
        camera.minZ = 1.0;

        function selectMesh(index) {
            switch (index) {
                case 0:
                    // Creating sphere
                    meshes.push(BABYLON.Mesh.CreateSphere("mesh", 16, 5, scene));
                    break;
                case 1:
                    // Creating Torus
                    meshes.push(BABYLON.Mesh.CreateTorus("mesh", 5, 1, 32, scene));
                    break;
                case 2:
                    // Creating Torus knot
                    meshes.push(BABYLON.Mesh.CreateTorusKnot("mesh", 2, 0.5, 128, 64, 2, 3, scene));
                    break;
                case 3:
                    meshes.push(BABYLON.Mesh.CreateGroundFromHeightMap("mesh", "heightMap.png", 8, 8, 100, 0, 3, scene, false));
                    break;
            }
        };

        selectMesh(0);

        // Compile
        var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./BABYLON_SHADER", {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });

        var refTexture = new BABYLON.Texture("ref.jpg", scene);
        refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
        refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;

        var mainTexture = new BABYLON.Texture("amiga.jpg", scene);

        shaderMaterial.setTexture("textureSampler", mainTexture);
        shaderMaterial.setTexture("refSampler", refTexture);
        shaderMaterial.setFloat("time", 0);
        shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        shaderMaterial.backFaceCulling = false;

        for (var index = 0; index < meshes.length; index++) {
            var mesh = meshes[index];
            mesh.material = shaderMaterial;
        }

        return scene;
    }

    var scene = createScene();
    var time = 0;
    engine.runRenderLoop(function() {
        var shaderMaterial = scene.getMaterialByName("shader");
        shaderMaterial.setFloat("time", time);
        time += 0.02;

        shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);

        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });
}
