import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterWidget from '../FilterWidget';

describe('<FilterWidget />', () => {
    it('render year filter', async () => {
        const rawData = {
            title: 'Launch Year',
            items: [
                {
                    key: 2006,
                    value: 2006,
                },
                {
                    key: 2007,
                    value: 2007,
                },
            ],
        };
        const filterSelection = {
            key: 'launch_year',
            value: 2007,
        };
        render(<FilterWidget {...rawData} filterSelection={filterSelection} />);
        screen.getByText(rawData.title);
    });

    it('render successful launch filter', async () => {
        const rawData = {
            title: 'Successful Launch',
            items: [
                {
                    key: true,
                    value: 'True',
                },
                {
                    key: false,
                    value: 'False',
                },
            ],
            key: 'launch_success',
        };
        const filterSelection = {
            key: rawData.key,
            value: true,
        };
        render(<FilterWidget {...rawData} filterSelection={filterSelection} />);
        screen.getByText(rawData.title);
    });
});
