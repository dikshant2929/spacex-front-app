import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../index';

describe('<Header />', () => {
    it('render title', async () => {
        const title = 'Company Name';
        render(<Header title={title}/>);
        screen.getByText(title);
    });
})
