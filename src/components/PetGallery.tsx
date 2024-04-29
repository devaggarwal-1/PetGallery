import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import useFetchPets from '../hooks/useFetchPets';
import { Pet } from '../hooks/useFetchPets';
import { saveAs } from 'file-saver';
import { motion } from "framer-motion"

const Gallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    
`;

const PetCard = styled(motion.div)`
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    background: #5f4c4c;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* justify-content: center; */

`;

const PetTitle = styled.h3`
    color: white;
`
const PetDesc = styled.p`
    color: #c5aa6a;
`

const PetImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 3px;
`;

const Button = styled.button`
    padding: 8px 10px;
    cursor: pointer;
    background: #2f2626;
    /* color: white; */
    color: #FFFFE0;
    font-weight: bold;
`;

const Input = styled.input`
    margin: 10px;
    padding: 8px;
`;

const Created = styled.small`
    color: #FFFFE0;
`

const HelperButtons = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 50px;

`

const DownloadButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 3%;
    
`

const SortingButton = styled.div`
    margin-left: 30%;
    display: flex;
    gap: 10px;
`

const Searching = styled.div`
`

const PetGallery = () => {
    const { data, loading, error } = useFetchPets('https://eulerity-hackathon.appspot.com/pets');
    const [pets, setPets] = useState<Pet[]>([])
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (data) {
            setPets(data.map((pet, i) => {
                return { ...pet, id: i, selected: false }
            }));  // Update pets state when data is loaded
        }
    }, [data]);

    const sortPets = (order: string) => {
        setSortOrder(order);
        const sortedPets = [...pets].sort((a, b) => {
            // if the order is 'ASC' will sort in ascending order
            if (order === 'ASC') {
                return a.title.localeCompare(b.title);

            } else {
                return b.title.localeCompare(a.title); // else in descending order
            }
        });
        setPets(sortedPets);
    };


    const toggleSelection = (id: number) => {
        console.log("Before update:", pets);
        const updatedPets = pets.map(pet => {
            return pet.id === id ? { ...pet, selected: !pet.selected } : pet

        });
        setPets(updatedPets)
        console.log(pets)
    }

    const selectAll = () => {
        setPets(pets.map(pet => {
            return { ...pet, selected: true }
        }))
    }

    const clearAll = () => {
        setPets(pets.map(pet => {
            return { ...pet, selected: false }
        }))
    }

    const downloadSelectedImages = () => {
        pets.forEach(pet => {
            if (pet.selected) {
                //'file-saver' package to help download the image
                saveAs(pet.url, pet.title)
            }
        })
    }

    const performSearch = () => {
        //searching based on title and description
        const result = pets.filter(pet =>
            pet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPets(result);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading pets!</p>;

    return (
        <>
            <HelperButtons>
                <DownloadButtons>
                    <Button onClick={downloadSelectedImages}>Download Selected Images</Button>
                    <Button onClick={selectAll}> Select All</Button>
                    <Button onClick={clearAll}> Clear Selection</Button>
                </DownloadButtons>

                <SortingButton>
                    <Button onClick={() => sortPets('ASC')}>Sort by Name A-Z</Button>
                    <Button onClick={() => sortPets('DESC')} > Sort by Name Z-A</Button >
                </SortingButton>

                <Searching>
                    <Input
                        type="text"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={(a) => setSearchTerm(a.target.value)}
                    />
                    <Button onClick={performSearch}>Search</Button>
                </Searching>

            </HelperButtons>

            <Gallery>
                {pets.map((pet, i) => {

                    return (
                        <PetCard key={pet.id} whileHover={{
                            scale: 1.1
                        }}>
                            <PetImage src={pet.url} alt={pet.title} />
                            <PetTitle >{pet.title}</PetTitle>
                            <PetDesc>{pet.description}</PetDesc>
                            <Created>Added on {new Date(pet.created).toLocaleDateString()}</Created>
                            <label>
                                <input
                                    type='checkbox'
                                    checked={pet.selected}
                                    onChange={() => toggleSelection(pet.id)}
                                />

                            </label>
                        </PetCard>
                    )
                }
                )}
            </Gallery>

        </>
    );
};

export default PetGallery;