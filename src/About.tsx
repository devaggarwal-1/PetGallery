import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const Heading = styled.h1`
    text-align: center;
    color: #333;
`;

const Text = styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: #666;
`;

const About = () => {
    return (
        <AboutContainer>
            <Heading>About PetGallery</Heading>
            <Text>
                PetGallery is an innovative application designed to showcase various pets through a visually engaging interface. Users can browse a diverse gallery of pet images, complete with detailed descriptions and pertinent information such as the date when the image was added.
            </Text>
            <Text>
                One of the standout features of PetGallery is the ability to download high-resolution images of your favorite pets. Whether you are looking for inspiration, considering adopting a pet, or simply enjoy viewing adorable pet photos, PetGallery provides a user-friendly platform to meet all your needs.
            </Text>
            <Text>
                This app leverages modern web technologies such as React, TypeScript, and styled-components, ensuring a smooth and responsive user experience. The ability to search, sort, and filter through the pet images allows you to find exactly what you're looking for with ease.
            </Text>
        </AboutContainer>
    );
};

export default About;
