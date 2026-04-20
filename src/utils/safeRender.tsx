import React from "react";

/**
 * Safely renders icons or components that might be Figma slots or objects
 * This prevents "Objects are not valid as a React child" errors
 */
export function safeRenderIcon(
  icon: any,
  className?: string
): React.ReactNode {
  // If null or undefined, return null
  if (!icon) return null;

  // If it's already a valid React element, return it
  if (React.isValidElement(icon)) {
    return icon;
  }

  // If it's a function/component, render it
  if (typeof icon === "function") {
    const IconComponent = icon;
    return <IconComponent className={className} />;
  }

  // If it's a Figma slot object with a render function
  if (
    typeof icon === "object" &&
    icon !== null &&
    "render" in icon &&
    typeof icon.render === "function"
  ) {
    const RenderFunction = icon.render;
    return <RenderFunction className={className} />;
  }

  // If it's a string or number, return it
  if (typeof icon === "string" || typeof icon === "number") {
    return icon;
  }

  // For any other case, return null to prevent errors
  console.warn("Unable to render icon:", icon);
  return null;
}

/**
 * Safely renders any node that might be complex
 */
export function safeRenderNode(node: any): React.ReactNode {
  if (!node) return null;

  // Primitive types
  if (typeof node === "string" || typeof node === "number") {
    return node;
  }

  // Array
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{safeRenderNode(child)}</React.Fragment>
    ));
  }

  // Valid React element
  if (React.isValidElement(node)) {
    return node;
  }

  // Function component
  if (typeof node === "function") {
    const Component = node;
    return <Component />;
  }

  // Figma slot object: { $$typeof, render } or { render: fn }
  if (
    typeof node === "object" &&
    node !== null &&
    "render" in node &&
    typeof node.render === "function"
  ) {
    const Component = node.render;
    return <Component />;
  }

  // Unknown object - don't render to prevent error
  console.warn("Unable to safely render node:", node);
  return null;
}
