if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");

    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function(shaderNum) {
        var scene = new BABYLON.Scene(engine);
        var meshes = [];
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);

        var num = 0;

        scene.actionManager = new BABYLON.ActionManager(scene)

        camera.attachControl(canvas, false);
        camera.lowerRadiusLimit = 1;
        camera.minZ = 1.0;

        function selectMesh(index) {
            switch (index) {
                case 0:
                    var options = {
                        width: 5.5,
                        height: 5.5,
                        depth: 5.5
                    };
                    meshes.push(BABYLON.MeshBuilder.CreateBox("mesh", options, scene));
                    break;
                case 1:
                    // Creating sphere
                    meshes.push(BABYLON.Mesh.CreateSphere("mesh", 16, 5, scene));
                    break;
                case 2:
                    meshes.push(BABYLON.Mesh.CreateSphere("mesh", 16, 5, scene));
                    meshes.push(BABYLON.Mesh.CreateSphere("mesh", 16, 5, scene));
                    break;
                case 3:
                    meshes.push(BABYLON.Mesh.CreateGroundFromHeightMap("mesh", "heightMap.png", 8, 8, 100, 0, 3, scene, false));
                    break;
            }
        };

        selectMesh(1);

        // Compile
        var shaderMaterial;
        switch (shaderNum) {
            case 0:
                shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./BABYLON_SHADER", {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                break;
            case 1:
                shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./WAVE_SHADER", {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                break
            case 2:
                shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./MONKEY", {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                break;
        }

        // var refTexture = new BABYLON.Texture("ref.jpg", scene);
        // refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
        // refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
        var mainTexture = new BABYLON.Texture("leopard-fur-texture.jpg", scene);
        shaderMaterial.setTexture("textureSampler", mainTexture);

        var grassTexture = new BABYLON.Texture("grass.jpg", scene);
        shaderMaterial.setTexture("tex0", grassTexture);

        var groundTexture = new BABYLON.Texture("ground2.jpg", scene);
        shaderMaterial.setTexture("tex1", groundTexture);

        var monkeyTexture = new BABYLON.Texture("monkey.png", scene);
        shaderMaterial.setTexture("monkeyTexture", monkeyTexture);

        shaderMaterial.setFloat("time", 0);
        shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        shaderMaterial.backFaceCulling = true;

        for (var index = 0; index < meshes.length; index++) {
            var mesh = meshes[index];
            mesh.material = shaderMaterial;
        }

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
            switch (evt.sourceEvent.key) {
                case 'q':
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.dispose();
                    }
                    meshes = []
                    break;
                case 'v':
                    shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./WAVE_SHADER", {
                        attributes: ["position", "normal", "uv"],
                        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                    });
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.material = shaderMaterial;
                    }
                    break;
                case 'd':
                    shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./BABYLON_SHADER", {
                        attributes: ["position", "normal", "uv"],
                        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                    });
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.material = shaderMaterial;
                    }
                    break;
                case '1':
                    selectMesh(parseInt(evt.sourceEvent.key) - 1);
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.material = shaderMaterial;
                    }
                    break;
                case '2':
                    selectMesh(parseInt(evt.sourceEvent.key) - 1);
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.material = shaderMaterial;
                    }
                    break;
                case '3':
                    selectMesh(parseInt(evt.sourceEvent.key) - 1);
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        console.log(mesh)
                        if (index % 2 == 0) {
                            mesh.material = shaderMaterial;
                        }
                        else {

                            var displaceMaterial = new BABYLON.ShaderMaterial("displace", scene, "./DISPLACE_SHADER", {
                                attributes: ["position", "normal", "uv"],
                                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                            });
                            var mainTexture = new BABYLON.Texture("leopard-fur-texture.jpg", scene);
                            displaceMaterial.setTexture("textureSampler", mainTexture);
                            mesh.material = displaceMaterial;
                        }
                    }
                    break;
                case '4':
                    selectMesh(parseInt(evt.sourceEvent.key) - 1);
                    for (var index = 0; index < meshes.length; index++) {
                        var mesh = meshes[index];
                        mesh.material = shaderMaterial;
                    }
                default:
            }

            // if (evt.sourceEvent.key == 'q') {
            //     for (var index = 0; index < meshes.length; index++) {
            //         var mesh = meshes[index];
            //         mesh.dispose();
            //     }
            // }
            // else if (evt.sourceEvent.key == 'v') {
            //     var waveMaterial = new BABYLON.ShaderMaterial("shader", scene, "./WAVE_SHADER", {
            //         attributes: ["position", "normal", "uv"],
            //         uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            //     });
            //     selectMesh(parseInt(1));
            //     for (var index = 0; index < meshes.length; index++) {
            //         var mesh = meshes[index];
            //         mesh.material = waveMaterial;
            //     }
            // }
            // else {
            //     selectMesh(parseInt(evt.sourceEvent.key) - 1);
            //     for (var index = 0; index < meshes.length; index++) {
            //         var mesh = meshes[index];
            //         mesh.material = shaderMaterial;
            //     }
            // }
        }));

        return scene;
    }

    var scene = createScene(0);
    var time = 0;
    engine.runRenderLoop(function() {
        var shaderMaterial = scene.getMaterialByName("shader");
        shaderMaterial.setFloat("time", time);
        time += 0.02;

        shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);

        scene.render();
    });

    canvas.addEventListener("keypress", function(event) {
        switch (event.key) {
            case 'w':
                var scene = createScene(1);
                var time = 0;
                engine.runRenderLoop(function() {
                    var shaderMaterial = scene.getMaterialByName("shader");
                    shaderMaterial.setFloat("time", time);
                    time += 0.02;
                    shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);
                    scene.render();
                });
                break;
            case 'm':
                var scene = createScene(2);
                var time = 0;
                engine.runRenderLoop(function() {
                    var shaderMaterial = scene.getMaterialByName("shader");
                    shaderMaterial.setFloat("time", time);
                    time += 0.02;
                    shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);
                    scene.render();
                });
                break;

        }
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });

    // scene.debugLayer.show();


}
