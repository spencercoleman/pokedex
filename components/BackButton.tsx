import { LinkBox, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function BackButton() {
	return (
		<LinkBox as={Link} href="/" my={2}>
			<Text as="b" fontSize="sm" color="GrayText">
				Back
			</Text>
		</LinkBox>
	);
}
