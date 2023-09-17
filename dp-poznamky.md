# What to write to DP

- 3D on the web occurs via HTML canvas element
- WebGL api GPU
- OpenGL ES is the spec that WebGL defines comunication between server and client GPU
- Canvas APIs
- WebXR extends features of other browser APIs like CanvasAPI and GamepadAPI
- WebGL is an implementation to creating graphics and rendering them to the screen, it is hard to write Web programs
- Abstraction of WebGL - three.js
- WebXR is an API that serves as a middle man between web app and XR device hardware
- provides a way to create an interface via web app to XR devices

A-frame

- Developed by Mozilla, the team behind Firefox, A-Frame is a framework
  for creating Three.js applications. A framework is to a Web application
  as an A-frame is to a house, for example. In engineering, an A-Frame is a
  simple structure made up of two beams positioned 45 degrees from the
  ground and attached at their adjoining ends, forming the outline of a letter
  “A”. The A-frame, therefore, is a skeleton of a structure, the armature that
  supports the design. Similarly, A-Frame, as a framework for Three.js, provides a set of
  rules and conveniences that place the writing of Three.js applications
  more closely in line with HTML documents. As has been the case with
  many other concepts in this course, perhaps it’ll be best to reach an
  understanding of A-Frame as a framework for Three.js by creating a simple
  scene. For Part 1 of Exercise 7, let’s build a basic scene in A-Frame that
  contains a sky, a light, a ground, a cube, and a material.

- design pattern
- ECS - entity component system
- A-Frame: An Entity Component System-Based Framework for Three.js
- three has featuers of OOP, mesh is inherited from th Object3D base class, WebXRManager extends WebGLRenderer object
- also ECS features - geometries, materials make mesh object, buffer objects have properties, textures include filters as components,

Entity - delcarative HTML syntax

- "abstractions of components"
- within the `<scene>` entity is collection of components - camera, ref to canvas element, three.scene object and WebGLRenderer in component called renderer

Component - object that define the character of entity - like "animation, background, camera component, 3d model, touch control.

- Components Individualize Entities - an generic entity with unique set of components is a unique entity
- UI for composing entities is HTML entities are elements and components are attributes with values set by : as in css

Primitives

- primitive shapes - eg. premade entiities

Systems

- , a system provides global scope, services, and management to
  classes of components
- eg. Asset Manager - provides func for preloading assets like images and models

Cusom components
schema - The schema keyword defines the attribute of
the custom component which will hold as key/value pairs the data of the
component

init - behaviour that will happen at the initialisation
update - behaviour that happens when component or its data undergoes a change

## Physics and User Interaction in A-frame

entities wrap components that create compelx object in 3D scene.

out of the box entities (primitives)
entities of our own composed of custom components build with aframe
extensibility of A-frame is not libmited to entities and compoentns

Game Engines vs Three + Aframe

- game engines inherently have physics systems in them (kinematics)
- extensibility of Aframe due to others peoples work is good

Via other libs written by other people.
