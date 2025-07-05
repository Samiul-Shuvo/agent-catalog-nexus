import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearch, setStatusFilter, setCategoryFilter, setPricingModelFilter, clearAllFilters } from '../store/agentSlice';

const AgentFilters = () => {
  const dispatch = useAppDispatch();
  const { filters, agents } = useAppSelector(state => state.agents);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Get unique categories from agents
  const categories = [...new Set(agents.map(agent => agent.category))].sort();
  const statuses = ['Active', 'Beta', 'Archived'];
  const pricingModels = ['Free Tier', 'Subscription', 'Per-Use'];

  const handleStatusChange = (status: string, checked: boolean) => {
    const updatedStatuses = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    dispatch(setStatusFilter(updatedStatuses));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked 
      ? [...filters.category, category]
      : filters.category.filter(c => c !== category);
    dispatch(setCategoryFilter(updatedCategories));
  };

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
    setShowAdvancedFilters(false);
  };

  const activeFiltersCount = filters.status.length + filters.category.length + (filters.pricingModel ? 1 : 0) + (filters.search ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search agents by name or description..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="pl-10 h-12 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllFilters}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </Button>
        )}

        {/* Active Filter Tags */}
        <div className="flex gap-2 flex-wrap">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-3 h-3"
                onClick={() => dispatch(setSearch(''))}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.status.map(status => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-3 h-3"
                onClick={() => handleStatusChange(status, false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
          {filters.category.map(category => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-3 h-3"
                onClick={() => handleCategoryChange(category, false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
          {filters.pricingModel && (
            <Badge variant="secondary" className="gap-1">
              {filters.pricingModel}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-3 h-3"
                onClick={() => dispatch(setPricingModelFilter(''))}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-border/50 bg-card/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Status</h4>
                  <div className="space-y-2">
                    {statuses.map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.status.includes(status)}
                          onCheckedChange={(checked) => handleStatusChange(status, !!checked)}
                        />
                        <label
                          htmlFor={`status-${status}`}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Category</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.category.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Model Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Pricing Model</h4>
                  <Select value={filters.pricingModel} onValueChange={(value) => dispatch(setPricingModelFilter(value))}>
                    <SelectTrigger className="bg-card/50 border-border/50">
                      <SelectValue placeholder="Select pricing model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Models</SelectItem>
                      {pricingModels.map(model => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AgentFilters;