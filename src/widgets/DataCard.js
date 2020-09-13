import React from 'react';
import { randomNumberGenerator } from '../utils';

const defaultProps = {
    title : {
        missionId : 'Mission Ids: ',
        launchYear : 'Launch Year: ',
        successFulLaunch : 'Successful Launch: ',
        successFulLanding : 'Successful Landing: '
    }
};

const DataCard = ({ title , data}) => {
    
    return (
        <div className="card-view data-card">
            <div className="image-wrapper">
                <img src={data.image} alt={data.title} loading="lazy" style={{width : "100%" }} />
                <h2 className="font-color-blue font-bold">{data.title}</h2>
            </div>

            <div className="summary mt-20">
                <div className="summary-item">
                    <span className="title">{title.missionId}</span>
                    <span className={`${data.missionId ? 'font-color-blue' : 'font-color-darkgray'} ml-5`}>{data.missionId || 'None'}</span>
                </div>
                <div className="summary-item">
                    <span className="title">{title.launchYear}</span>
                    <span className="font-color-blue ml-5">{data.lunchYear}</span>
                </div>
                <div className="summary-item">
                    <span className="title">{title.successFulLaunch}</span>
                    <span className="font-color-blue ml-5">{data.launchSuccess}</span>
                </div>
                <div className="summary-item">
                    <span className="title">{title.successFulLanding}</span>
                    <span className="font-color-blue ml-5">{data.landSuccess}</span>
                </div>
            </div>
        </div>
    );
}

DataCard.defaultProps = defaultProps;
export default DataCard;