import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAgents } from '../store/agentSlice';
import AgentCard from './AgentCard';
import AgentFilters from './AgentFilters';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Sparkles, Zap, Search, RotateCcw } from 'lucide-react';

const AgentCatalog = () => {
  const dispatch = useAppDispatch();
  const { filteredAgents, loading, filters } = useAppSelector(state => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const getPageTitle = () => {
    let title = 'ArkLab AI Agents Catalog';
    const activeFilters = [];
    
    if (filters.search) activeFilters.push(`"${filters.search}"`);
    if (filters.status.length > 0) activeFilters.push(filters.status.join(', '));
    if (filters.category.length > 0) activeFilters.push(filters.category.join(', '));
    if (filters.pricingModel) activeFilters.push(filters.pricingModel);
    
    if (activeFilters.length > 0) {
      title += ` - ${activeFilters.join(' • ')}`;
    }
    
    return title;
  };

  const getPageDescription = () => {
    const totalAgents = filteredAgents.length;
    let description = `Discover ${totalAgents} AI agents for various business needs including customer service, marketing, development, and more.`;
    
    if (filters.search || filters.status.length > 0 || filters.category.length > 0 || filters.pricingModel) {
      description += ' Filtered results based on your search criteria.';
    }
    
    return description;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading AI Agents - ArkLab</title>
          <meta name="description" content="Loading AI agents catalog..." />
        </Helmet>
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          
          {/* Filters Skeleton */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 p-6 border border-border/50 rounded-lg bg-card/30">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="AI agents, artificial intelligence, automation, chatbots, business tools, customer service, marketing, development" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-primary/10 via-background to-tech-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Bot className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-tech-secondary"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 rounded-full bg-tech-accent/30 flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-tech-accent" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-tech-secondary bg-clip-text text-transparent mb-6">
              AI Agents Catalog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover powerful AI agents designed to transform your business operations. 
              From customer service to content generation, find the perfect AI solution for your needs.
            </p>
            
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-tech-secondary" />
                <span>{filteredAgents.length} Active Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-tech-accent" />
                <span>Multiple Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span>Flexible Pricing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Filters */}
        <div className="mb-8">
          <AgentFilters />
        </div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredAgents.length}</span> 
            {filteredAgents.length === 1 ? ' agent' : ' agents'}
            {(filters.search || filters.status.length > 0 || filters.category.length > 0 || filters.pricingModel) 
              && ' matching your criteria'}
          </p>
        </motion.div>

        {/* Agent Grid */}
        <AnimatePresence mode="wait">
          {filteredAgents.length > 0 ? (
            <motion.div
              key="agents-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAgents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">No agents found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any agents matching your current search criteria. 
                Try adjusting your filters or search terms.
              </p>
              <Button 
                onClick={() => dispatch({ type: 'agents/clearAllFilters' })}
                variant="outline"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgentCatalog;