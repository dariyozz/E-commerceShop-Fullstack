import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory } : any) => (
    <div className="mb-4">
        <label htmlFor="category" className="mr-2">Filter by Category:</label>
        <select id="category" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory || ''}>
            <option value="">All</option>
            {categories.map((category : any) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    </div>
);

export default CategoryFilter;
