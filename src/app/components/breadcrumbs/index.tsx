'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
	Breadcrumbs as AriaBreadcrumbs,
	Item,
	Link
} from 'react-aria-components';

const Breadcrumbs = (): React.ReactElement => {
	const path = usePathname();

	const breadcrumbs = useMemo(
		function generateBreadcrumbs() {
			const asPathWithoutQuery = path.split('?')[0];
			const asPathNestedRoutes = asPathWithoutQuery
				.split('/')
				.filter((v) => v.length > 0);

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				const text = firstLetterToUppercase(subpath.replace('-', ' '));

				if (idx === asPathNestedRoutes.length - 1) {
					return { href: undefined, text };
				}

				const href = `/${asPathNestedRoutes
					.slice(0, idx + 1)
					.join('/')}`;

				return { href, text };
			});

			return [{ href: '/', text: 'Início' }, ...crumblist];
		},
		[path]
	);

	return (
		<AriaBreadcrumbs className="breadcrumbs">
			{breadcrumbs.map((item, idx) => (
				<Item key={String(idx)}>
					{item.href ? (
						<Link>
							<a href={item.href}>{item.text}</a>
						</Link>
					) : (
						<Link>{item.text}</Link>
					)}
				</Item>
			))}
		</AriaBreadcrumbs>
	);
};

function firstLetterToUppercase(str: string) {
	const parts = str.split(' ');

	const formattedStr = parts.map(
		(item) => item.at(0)?.toUpperCase() + item.substring(1)
	);

	return formattedStr.join(' ');
}

export { Breadcrumbs };
