import React from 'react';
import FilterWidget from '../widgets/FilterWidgets/FilterWidget';
import DataCard from '../widgets/DataCard/DataCard';
import { randomNumberGenerator, capitalize } from '../utils';

const defaultProps = {
    title: 'Filters',
    filters: {
        year: {
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
                {
                    key: 2008,
                    value: 2008,
                },
                {
                    key: 2009,
                    value: 2009,
                },
                {
                    key: 2010,
                    value: 2010,
                },
                {
                    key: 2011,
                    value: 2011,
                },
                {
                    key: 2012,
                    value: 2012,
                },
                {
                    key: 2013,
                    value: 2013,
                },
                {
                    key: 2014,
                    value: 2014,
                },
                {
                    key: 2015,
                    value: 2015,
                },
                {
                    key: 2016,
                    value: 2016,
                },
                {
                    key: 2017,
                    value: 2017,
                },
                {
                    key: 2018,
                    value: 2018,
                },
                {
                    key: 2019,
                    value: 2019,
                },
                {
                    key: 2020,
                    value: 2020,
                },
            ],
            key: 'launch_year',
        },
        launch: {
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
        },
        landing: {
            title: 'Successful Landing',
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
            key: 'land_success',
        },
    },
    imageFallBack: 'https://via.placeholder.com/312/F2F2F2/000000?Text=NoImage',
};

const HomePage = ({ data, parameters, onChange, ...props }) => {
    const refineData = item => {
        const {
            mission_name,
            flight_number,
            mission_id,
            launch_year,
            launch_success = false,
            rocket,
            links,
        } = item;
        const landSuccess = rocket?.first_stage?.cores.some(
            ({ land_success }) => land_success === true
        );
        return {
            image: links.mission_patch_small || props.imageFallBack,
            title: mission_name.concat(' #').concat(flight_number),
            lunchYear: launch_year,
            launchSuccess: capitalize(launch_success?.toString() || 'None'),
            missionId: mission_id.toString(),
            landSuccess: capitalize(landSuccess.toString() || 'None'),
        };
    };

    const getUpdatedParams = parameters => {
        const offset = Number(parameters['offset']);
        const limit = Number(parameters['limit']);
        return {
            key: 'offset',
            value: offset + limit,
        };
    };

    const isButtonVisible = () => {
        return (
            Number(parameters['limit']) <= data.length &&
            Number(parameters['offset']) < data.length
        );
    };

    const getFilterFormattedData = key => {
        return {
            key,
            value: parameters[key],
        };
    };
    return (
        <>
            <aside>
                <div className="card-view filter-main">
                    <div className="font-bold heading">Filters</div>
                    <FilterWidget
                        {...props.filters.year}
                        onChange={onChange}
                        filterSelection={getFilterFormattedData('launch_year')}
                    />
                    <FilterWidget
                        {...props.filters.launch}
                        onChange={onChange}
                        filterSelection={getFilterFormattedData(
                            'launch_success'
                        )}
                    />
                    <FilterWidget
                        {...props.filters.landing}
                        onChange={onChange}
                        filterSelection={getFilterFormattedData('land_success')}
                    />
                </div>
            </aside>
            {data && Array.isArray(data) && (
                <main>
                    <ul>
                        {data.map(item => (
                            <li
                                className="card-view"
                                key={randomNumberGenerator()}
                            >
                                <DataCard data={refineData(item)} />
                            </li>
                        ))}
                    </ul>

                    {isButtonVisible() && (
                        <div className="text-center">
                            <button
                                className="load-more-button"
                                onClick={() =>
                                    onChange(getUpdatedParams(parameters))
                                }
                            >
                                SHOW MORE
                            </button>
                        </div>
                    )}
                </main>
            )}
        </>
    );
};

HomePage.defaultProps = defaultProps;
export default HomePage;
