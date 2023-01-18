import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ErrorWrapper } from './styles/error.style';


export const errors = {
    404: {
        title: 'The page you are looking for isn’t here',
        text: `You either tried some shady route or you came here by mistake. Whichever
                it is, try using the navigation`,
        img: {
            alt: 'Page down',
            src: '/img/server-down-404.svg'
        },
        button: {
            text: 'Back to Home'
        }
    },
    500: {
        title: '500: Ooops, something went terribly wrong!',
        text: `You either tried some shady route or you came here by mistake. Whichever
                it is, try using the navigation`,
        img: {
            alt: 'Page down',
            src: '/img/server-down-500.svg'
        },
        button: {
            text: 'Back to Home'
        }
    }
}

export type ErrorCode = 404 | 500

type ErrorProps = {
    status: ErrorCode,

}
export const Error = ({ status }: ErrorProps) => {
    const error = errors[status]
    return (
        <ErrorWrapper >
            <Typography align='center' variant='h2'>
                {error.title}
            </Typography>
            <Typography align='center' variant='subtitle2'>
                {error.text}
            </Typography>
            <div className='image-container'>
                <img
                    alt={error.img.alt}
                    className='image'
                    src={error.img.src}
                />
            </div>
            <div className='button-container'>
                <Button
                    color='primary'
                    component={Link}
                    to='/'
                    variant='outlined'
                >
                    {error.button.text}
                </Button>
            </div>
        </ErrorWrapper>
    );
};