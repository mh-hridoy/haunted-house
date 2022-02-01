import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()



const fog = new THREE.Fog("#262837", 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


// door textures
const doorColorTextTure = textureLoader.load('/textures/door/color.jpg')
const doorambientOcclusionTextTure = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const dooralphaTextTure = textureLoader.load('/textures/door/alpha.jpg')
const doorheightTextTure = textureLoader.load('/textures/door/height.jpg')
const doornormalTextTure = textureLoader.load('/textures/door/normal.jpg')
const doormetalnessTextTure = textureLoader.load("/textures/door/metalness.jpg")
const doorroughnessTextTure = textureLoader.load("/textures/door/roughness.jpg")

// brick textures
const bricksColorTextTure = textureLoader.load("/textures/bricks/color.jpg")
const bricksambientOcclusionTextTure = textureLoader.load("/textures/bricks/ambientOcclusion.jpg")
const bricksnormalTextTure = textureLoader.load("/textures/bricks/normal.jpg")
const bricksroughnessTextTure = textureLoader.load("/textures/bricks/roughness.jpg")

// floor textures
const grassColorTextTure = textureLoader.load("/textures/grass/color.jpg")
const grassambientOcclusionTextTure = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
)
const grassnormalTextTure = textureLoader.load("/textures/grass/normal.jpg")
const grassroughnessTextTure = textureLoader.load(
  "/textures/grass/roughness.jpg"
)

grassColorTextTure.repeat.set(8, 8)
grassambientOcclusionTextTure.repeat.set(8, 8)
grassnormalTextTure.repeat.set(8, 8)
grassroughnessTextTure.repeat.set(8, 8)

grassroughnessTextTure.wrapS = THREE.RepeatWrapping
grassambientOcclusionTextTure.wrapS = THREE.RepeatWrapping
grassnormalTextTure.wrapS = THREE.RepeatWrapping
grassroughnessTextTure.wrapS = THREE.RepeatWrapping

grassroughnessTextTure.wrapT = THREE.RepeatWrapping
grassambientOcclusionTextTure.wrapT = THREE.RepeatWrapping
grassnormalTextTure.wrapT = THREE.RepeatWrapping
grassroughnessTextTure.wrapT = THREE.RepeatWrapping

/**
 * House
 */

const house = new THREE.Group()
scene.add(house)

const wall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ map: bricksColorTextTure, aoMap: bricksambientOcclusionTextTure, normalMap: bricksnormalTextTure, roughnessMap: bricksroughnessTextTure  })
)

wall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array, 2))
wall.position.y = 2.5 / 2

house.add(wall)

const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 2, 4),
  new THREE.MeshStandardMaterial({ map: bricksColorTextTure, roughnessMap: bricksroughnessTextTure, normalMap: bricksnormalTextTure, aoMap: bricksambientOcclusionTextTure })
)

roof.position.y = 2.5 + 1
roof.rotation.y = Math.PI / 4
house.add(roof)

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({ map: doorColorTextTure, alphaMap : dooralphaTextTure, metalnessMap : doormetalnessTextTure, roughnessMap: doorroughnessTextTure, normalMap: doornormalTextTure, aoMap: doorambientOcclusionTextTure, displacementMap: doorheightTextTure, displacementScale: 0.2, transparent: true })
)

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.z = 2 + 0.01
door.position.y = 1

house.add(door)

const bushGeometry = new THREE.SphereBufferGeometry(0.9, 32, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: "green" })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.5, 0.5, 0.5)
bush3.position.set(-0.8, 0.2, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.25, 0.25, 0.25)
bush4.position.set(-1.4, 0.1, 2)

house.add(bush1, bush2, bush3, bush4)


const graveGeometry = new THREE.BoxBufferGeometry(0.4, 0.5, 0.4)
const graveMaterial = new THREE.MeshStandardMaterial({ color: "gray"})



for(let i= 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 6
  const x = Math.sin(angle) * radius
  const y = Math.cos(angle) * radius

//   console.log(x, y)

//   console.log(radius)

  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.set(x, 0.2, y)
  grave.rotation.y = (Math.random() -0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.castShadow = true
  house.add(grave)
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({ map: grassColorTextTure, aoMap: grassambientOcclusionTextTure, normalMap: grassnormalTextTure
, roughnessMap: grassroughnessTextTure })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12)
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, "intensity").min(0).max(1).step(0.001)
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001)
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001)
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001)

scene.add(moonLight)

const doorLight = new THREE.PointLight("#ff7d45", 1, 7)
doorLight.position.set(0, 2, 2.7 )

house.add(doorLight)
// const lightHelper = new THREE.PointLightHelper(doorLight, 2, "red")
// house.add(lightHelper)



// ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3)
const ghost2 = new THREE.PointLight("#00ffff", 2, 3)
const ghost3 = new THREE.PointLight("#ffff00", 2, 3)

scene.add(ghost3, ghost2, ghost1)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#262837")
renderer.shadowMap.enabled= true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
wall.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
door.castShadow = true
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.mapSize.far = 7


ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.mapSize.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.mapSize.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.mapSize.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()


  const ghostOneAngle = elapsedTime * 0.5
  ghost1.position.x = Math.sin(ghostOneAngle) * 4
  ghost1.position.z = Math.cos(ghostOneAngle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3) 

   const ghostTwoAngle = -elapsedTime * 0.32
   ghost2.position.x = Math.sin(ghostTwoAngle) * 5
   ghost2.position.z = Math.cos(ghostTwoAngle) * 5
   ghost2.position.y = Math.sin(elapsedTime *4) + Math.sin(elapsedTime * 2.5)

   const ghostThreeAngle = -elapsedTime * 0.18
   ghost3.position.x = Math.sin(ghostThreeAngle) *( 8 + Math.sin(ghostThreeAngle + 7))
   ghost3.position.z =
     Math.cos(ghostThreeAngle) * (8 + Math.sin(ghostThreeAngle + 6))
   ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(ghostThreeAngle + 4)


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
