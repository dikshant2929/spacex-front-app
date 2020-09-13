import React from 'react';
import { randomNumberGenerator } from '../../utils';

const defaultProps = {
    title: 'Launch Year',
    items: [
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
    ],
    key: 'launch_year',
};

//key
const FilterWidget = ({ title, items, onChange, filterSelection }) => {
    const getCamparisionValue = value => {
        if (value !== '') {
            if (
                value === 'true' ||
                value === 'false' ||
                typeof value === 'boolean'
            ) {
                if (value === 'true') {
                    return true;
                } else if (value === 'false') {
                    return false;
                } else {
                    return value;
                }
            } else if (!isNaN(value) || typeof value === 'number') {
                return Number(value);
            }
        }
        return null;
    };

    return (
        <div className="filter-sub-view">
            <h4 className="text-center">{title}</h4>
            <ul>
                {/* {key, value} */
                items.map(({ key, value }) => (
                    <li
                        className={
                            getCamparisionValue(filterSelection.value) === key
                                ? 'active'
                                : undefined
                        }
                        key={randomNumberGenerator()}
                        onClick={event =>
                            onChange({
                                key: filterSelection.key,
                                value: key.toString(),
                            })
                        }
                    >
                        <div className="card-view filter-item text-center">
                            <span>{value}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

FilterWidget.defaultProps = defaultProps;
export default FilterWidget;
