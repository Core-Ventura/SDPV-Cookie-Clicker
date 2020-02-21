// Constructor
CookieApp = function()
{
	Sim.App.call(this);
}

// Subclass Sim.App
CookieApp.prototype = new Sim.App();

// Our custom initializer
CookieApp.prototype.init = function(param)
{
	// Call superclass init code to set up scene, renderer, default camera
	Sim.App.prototype.init.call(this, param);
	
    // Create a directional light to show off the cookie
	var light = new THREE.DirectionalLight( 0xeeeeff, 1);
	light.position.set(0, 0, 1);
	this.scene.add(light);
	
	this.camera.position.set(0, 0, 8);
	
    var cookie = new Cookie();
    cookie.init();
    this.addObject(cookie);
    
    // This cookie was modeled with x, z flipped so rotate it toward the camera
	
	this.root.rotation.y = Math.PI / 4;
    this.cookie = cookie;
}

CookieApp.prototype.update = function()
{
	this.root.rotation.y += 0.005;
	Sim.App.prototype.update.call(this);
}

// Cookie class
Cookie = function()
{
	Sim.Object.call(this);
}

Cookie.prototype = new Sim.Object();

Cookie.prototype.init = function()
{
    // Create a group to hold the cookie
	var bodygroup = new THREE.Object3D;
    // Tell the framework about our object
    this.setObject3D(bodygroup);	
	
	var that = this;
	var url = 'models/cookiex.dae';
	var loader = new Sim.ColladaLoader;

	loader.load(url, function (data) {
		that.handleLoaded(data)
	});
}

Cookie.prototype.handleLoaded = function(data)
{
	if (data)
	{
		var model = data.scene;

		var map = THREE.ImageUtils.loadTexture('images/cookiet.jpg');
		var material = new THREE.MeshLambertMaterial({ map : map});

	    model.scale.set(1, 1, 1);
	    this.object3D.add(model);
	}	
	setMaterial(model, material);
}

var setMaterial = function(node, material) {
	node.material = material;
	if (node.children) {
	  for (var i = 0; i < node.children.length; i++) {
		setMaterial(node.children[i], material);
	  }
	}
  }