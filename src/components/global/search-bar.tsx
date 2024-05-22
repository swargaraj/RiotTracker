import React from 'react'
import Search from '../ui/search'
import dummyData from '@/lib/dummy-data'
import { Button } from '../ui/buttons'

interface Props {
    
}

const SearchBar = (props: Props) => {
    return (
        <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <div className="container mx-auto p-5">
                <Search data={dummyData} />
            </div>
            <Button
                variant="outline"
                size="icon"
            >
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    </div>
    )
}

export default SearchBar
