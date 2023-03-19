import { Button } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function BackButton() {
    return (
        <NextLink href="/" passHref legacyBehavior>
            <Button
                leftIcon={<ArrowLeftIcon />}
                variant="outline"
                fontSize="sm"
                color="GrayText"
            >
                Back
            </Button>
        </NextLink>
    );
}
