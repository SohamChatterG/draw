import React from "react";
// Global mapping for hash -> original
const mapping = new Map();
export function useHash() {
  function generateHash(input, length = 10) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash * 31 + input.charCodeAt(i)) % 1000000007;
    }
    const base36Hash = hash.toString(36).padStart(length, "0").slice(0, length);
    mapping.set(base36Hash, input); // Store mapping for reverse lookup
    return base36Hash;
  }

  // Function to retrieve the original value
  function getOriginal(hash) {
    return mapping.get(hash) || "Original not found!";
  }

  // Example Usage
  return { generateHash, getOriginal };
}

export default useHash;
