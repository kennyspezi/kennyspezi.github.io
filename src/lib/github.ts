/**
 * Unified GitHub API utilities
 * Consolidates duplicate API fetching logic from multiple components
 */

const GITHUB_USERNAME = 'kennyspezi';
const API_BASE = 'https://api.github.com';

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  fork: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: any;
  created_at: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

/**
 * Fetch all public repositories for the user
 */
export async function getAllRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch repos:', error);
    return [];
  }
}

/**
 * Fetch only original (non-forked) repositories
 */
export async function getOriginalRepos(): Promise<GitHubRepo[]> {
  const allRepos = await getAllRepos();
  return allRepos.filter(repo => !repo.fork);
}

/**
 * Fetch only forked repositories
 */
export async function getForkedRepos(): Promise<GitHubRepo[]> {
  const allRepos = await getAllRepos();
  return allRepos.filter(repo => repo.fork);
}

/**
 * Fetch recent public events for the user
 */
export async function getRecentEvents(perPage: number = 10): Promise<GitHubEvent[]> {
  try {
    const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=${perPage}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

/**
 * Find the most recently active repository based on events
 */
export async function getFeaturedRepo(): Promise<GitHubRepo | null> {
  try {
    const events = await getRecentEvents(10);
    
    // Find the most recent push or activity event
    const relevantEvent = events.find(e => 
      e.type === 'PushEvent' || 
      e.type === 'CreateEvent' || 
      e.type === 'PullRequestEvent'
    );
    
    if (relevantEvent) {
      const repoName = relevantEvent.repo.name;
      const response = await fetch(`${API_BASE}/repos/${repoName}`);
      if (response.ok) {
        return await response.json();
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch featured repo:', error);
    return null;
  }
}

/**
 * Fetch recent commits for a specific repository
 */
export async function getRecentCommits(repoFullName: string, count: number = 3): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(`${API_BASE}/repos/${repoFullName}/commits?per_page=${count}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch commits for ${repoFullName}:`, error);
    return [];
  }
}

/**
 * Get a preview image URL for a repository
 * Checks for common image paths in the repo
 */
export async function getPreviewImage(repoFullName: string): Promise<string | null> {
  const imagePaths = [
    'preview.png',
    'preview.jpg',
    'screenshot.png',
    'screenshot.jpg',
    'demo.png',
    'demo.jpg',
    'cover.png',
    'cover.jpg'
  ];

  for (const path of imagePaths) {
    try {
      const url = `https://raw.githubusercontent.com/${repoFullName}/main/${path}`;
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  // Try master branch if main didn't work
  for (const path of imagePaths) {
    try {
      const url = `https://raw.githubusercontent.com/${repoFullName}/master/${path}`;
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  return null;
}

/**
 * Format a date relative to now (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
  if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  if (diffWeek > 0) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  return 'just now';
}

/**
 * Get the most recent activity message
 */
export async function getActivityStatus(): Promise<string> {
  try {
    const events = await getRecentEvents(1);
    if (events.length === 0) {
      return 'No recent activity';
    }

    const event = events[0];
    const timeAgo = formatRelativeTime(event.created_at);
    const repoName = event.repo.name.split('/')[1];

    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload.commits?.length || 1;
        return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName} ${timeAgo}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${repoName} ${timeAgo}`;
      case 'PullRequestEvent':
        return `${event.payload.action} a pull request in ${repoName} ${timeAgo}`;
      case 'IssuesEvent':
        return `${event.payload.action} an issue in ${repoName} ${timeAgo}`;
      case 'WatchEvent':
        return `Starred ${repoName} ${timeAgo}`;
      case 'ForkEvent':
        return `Forked ${repoName} ${timeAgo}`;
      default:
        return `Active on ${repoName} ${timeAgo}`;
    }
  } catch (error) {
    console.error('Failed to get activity status:', error);
    return 'Unable to fetch activity';
  }
}
