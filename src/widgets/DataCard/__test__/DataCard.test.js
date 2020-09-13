import React from 'react';
import { render, screen } from '@testing-library/react';
import DataCard from '../DataCard';

describe('<DataCard />', () => {
    it('render title of data', async () => {
        const rawData = {
            data: {
                title: 'SpaceX Program',
            },
        };
        render(<DataCard {...rawData} />);
        screen.getByText(rawData.data.title);
    });
});
