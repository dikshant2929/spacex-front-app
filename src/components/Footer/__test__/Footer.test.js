import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../index';

describe('<Footer />', () => {
    it('render developer name', async () => {
        const developerName = 'New Developer';
        render(<Footer developerName={developerName}/>);
        screen.getByText(developerName);
    });

    it('render title', async () => {
        const title = 'Created By';
        render(<Footer title={title}/>);
        screen.getByText(title);
    });
})
