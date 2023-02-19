import * as React from 'react';
import './home.scss';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Home() {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <>
            <div className='container'>
                <div className='row-card'>
                    <div className='item-card'>
                        <div className="card" >

                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/cafe" class="btn btn-primary">Cafe</a>
                            </div>
                        </div>
                    </div>
                    <div className='item-card'>
                        <div className="card" >

                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/employee" class="btn btn-primary">Employee</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

