// NASA Near-Earth Object Web Service (NeoWs) API
// Documentation: https://api.nasa.gov/

const NASA_API_KEY = 'DEMO_KEY'; // Replace with actual key for production
const NASA_NEO_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export interface NASANearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    };
  }>;
  orbital_data?: {
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    data_arc_in_days: number;
    observations_used: number;
    orbit_uncertainty: string;
    minimum_orbit_intersection: string;
    jupiter_tisserand_invariant: string;
    epoch_osculation: string;
    eccentricity: string;
    semi_major_axis: string;
    inclination: string;
    ascending_node_longitude: string;
    orbital_period: string;
    perihelion_distance: string;
    perihelion_argument: string;
    aphelion_distance: string;
    perihelion_time: string;
    mean_anomaly: string;
    mean_motion: string;
  };
}

export interface NASANeoFeed {
  links: {
    next: string;
    prev: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [date: string]: NASANearEarthObject[];
  };
}

export const nasaApi = {
  /**
   * Get asteroids approaching Earth within a date range
   */
  async getNeoFeed(startDate: string, endDate: string): Promise<NASANeoFeed> {
    const url = `${NASA_NEO_BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching NEO feed:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific asteroid
   */
  async getNeoById(asteroidId: string): Promise<NASANearEarthObject> {
    const url = `${NASA_NEO_BASE_URL}/neo/${asteroidId}?api_key=${NASA_API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching NEO details:', error);
      throw error;
    }
  },

  /**
   * Browse all asteroids with pagination
   */
  async browseNeos(page: number = 0, size: number = 20) {
    const url = `${NASA_NEO_BASE_URL}/neo/browse?page=${page}&size=${size}&api_key=${NASA_API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error browsing NEOs:', error);
      throw error;
    }
  },

  /**
   * Get asteroids approaching Earth today
   */
  async getTodayNeos(): Promise<NASANeoFeed> {
    const today = new Date().toISOString().split('T')[0];
    return this.getNeoFeed(today, today);
  },

  /**
   * Get asteroids approaching Earth in the next 7 days
   */
  async getUpcomingNeos(): Promise<NASANeoFeed> {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const startDate = today.toISOString().split('T')[0];
    const endDate = nextWeek.toISOString().split('T')[0];
    
    return this.getNeoFeed(startDate, endDate);
  }
};