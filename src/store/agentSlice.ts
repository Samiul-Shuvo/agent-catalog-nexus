import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Agent, AgentState, AgentFilters } from '../types/agent';
import mockAgents from '../data/mock-agents.json';

// Simulate async data fetching
export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAgents as Agent[];
  }
);

const initialState: AgentState = {
  agents: [],
  filteredAgents: [],
  filters: {
    search: '',
    status: [],
    category: [],
    pricingModel: '',
  },
  loading: false,
};

const applyFilters = (agents: Agent[], filters: AgentFilters): Agent[] => {
  return agents.filter(agent => {
    // Search filter (name or description)
    const searchMatch = !filters.search || 
      agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      agent.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Status filter
    const statusMatch = filters.status.length === 0 || 
      filters.status.includes(agent.status);
    
    // Category filter
    const categoryMatch = filters.category.length === 0 || 
      filters.category.includes(agent.category);
    
    // Pricing model filter
    const pricingMatch = !filters.pricingModel || 
      agent.pricingModel === filters.pricingModel;
    
    return searchMatch && statusMatch && categoryMatch && pricingMatch;
  });
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filteredAgents = applyFilters(state.agents, state.filters);
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.status = action.payload;
      state.filteredAgents = applyFilters(state.agents, state.filters);
    },
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.category = action.payload;
      state.filteredAgents = applyFilters(state.agents, state.filters);
    },
    setPricingModelFilter: (state, action: PayloadAction<string>) => {
      state.filters.pricingModel = action.payload;
      state.filteredAgents = applyFilters(state.agents, state.filters);
    },
    clearAllFilters: (state) => {
      state.filters = {
        search: '',
        status: [],
        category: [],
        pricingModel: '',
      };
      state.filteredAgents = state.agents;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
        state.filteredAgents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setPricingModelFilter,
  clearAllFilters,
} = agentSlice.actions;

export default agentSlice.reducer;