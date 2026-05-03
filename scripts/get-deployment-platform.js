#!/usr/bin/env node

/**
 * Get deployment platform from config
 * This script reads the deployment platform from src/config.ts
 */

import { readFileSync } from 'fs';
import { join } from 'path';

function getDeploymentPlatform() {
  try {
    const configPath = join(process.cwd(), 'src', 'config.ts');
    const configContent = readFileSync(configPath, 'utf8');
    
    // Extract platform from config - use the config marker to find the actual assignment
    const platformMatch = configContent.match(/\/\/\s*\[CONFIG:DEPLOYMENT_PLATFORM\]\s*[\r\n]+\s*platform:\s*["']([^"']+)["']/);
    
    if (platformMatch) {
      return platformMatch[1];
    }
    
    // Fallback to environment variable
    return process.env.DEPLOYMENT_PLATFORM || 'netlify';
  } catch (error) {
    console.error('Error reading config:', error.message);
    return process.env.DEPLOYMENT_PLATFORM || 'netlify';
  }
}

// Export for use in other scripts
export default getDeploymentPlatform;

// If run directly, output the platform
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(getDeploymentPlatform());
}