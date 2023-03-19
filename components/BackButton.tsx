import { Button } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function BackButton() {
    return (
        <NextLink href="/" passHref legacyBehavior>
            <Button
                leftIcon={<ArrowLeftIcon boxSize={2.5} />}
                variant="outline"
                fontSize="sm"
                fontWeight="normal"
                color="GrayText"
            >
                Back
            </Button>
        </NextLink>
    );
}
