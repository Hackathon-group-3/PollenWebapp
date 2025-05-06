"use client"

import { Search } from "lucide-react"
import styles from "./locationSearch.module.css"
import { useState } from "react"
import Button  from '@mui/material/Button';
import Input from '@mui/material/Input';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Location_component( { onSearch }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
    
        setIsSearching(true)
        onSearch(searchQuery)
    
        // Reset searching state after a delay
        setTimeout(() => {
          setIsSearching(false)
        }, 1000)
      }

    return ( 
    <div className = {styles.location_component}>
        <Card className= {styles.location_card}>
            <CardContent className= {styles.location_card}>
                <form onSubmit={handleSubmit} id={styles.form_parent}>
                    <Input 
                    className = {styles.location_input} 
                    id = {styles.location_text_input}
                    type="text"
                    placeholder="Enter a zip code or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className = {styles.location_input} />
                    <Button 
                    className = {styles.location_input} 
                    variant="contained"
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    size="sm"
                    >
                        {isSearching ? "Searching..." : "Search"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div> 
    );
    
  }
