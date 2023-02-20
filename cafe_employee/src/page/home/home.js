import * as React from 'react';
import './home.scss';


export default function Home() {
    return (
        <>
            <div className='container'>
                <div className='row row-card'>
                    <div className='col-md-3 mb-3'>
                        <div className="card" >
                            <div class="card-body">
                                <h5 class="card-title">Card Cafe</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/cafe" class="btn btn-primary">Go To Cafe</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                        <div className="card" >
                            <div class="card-body">
                                <h5 class="card-title">Card Employee</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/employee" class="btn btn-primary">Go To Employee</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

