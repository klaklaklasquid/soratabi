#version 300 es
precision mediump float;

in vec3 vNormal;
in vec3 vWorldPos;

out vec4 fragColor;

uniform vec3 uCameraPos;
uniform float uTime;
uniform vec3 uBaseColor;   // e.g. vec3(1.0, 0.9, 0.6)
uniform float uGlowIntensity; // e.g. 2.0

void main() {
    // Direction from fragment to camera
    vec3 viewDir = normalize(uCameraPos - vWorldPos);

    // Fresnel effect: glow more at edges
    float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.0);

    // Base glow color with gentle time pulsation
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
    vec3 glow = uBaseColor * mix(0.8, 1.2, pulse) * uGlowIntensity * fresnel;

    // Final color (clamped for safety)
    fragColor = vec4(glow, 1.0);
}
