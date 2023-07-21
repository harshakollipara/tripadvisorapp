import Order from '@/components/order'
import prisma from '@/lib/prisma'
import { ClockIcon } from '@radix-ui/react-icons'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Product({
	params,
}: {
	params: { slug: string }
}) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(params.slug) },
	})

	const session = await getServerSession()

	return (
		<div>
			<h1 className="text-xl font-bold mb-5">Package</h1>

			<section>
				{product?.imageUrl ? (
					<div className="relative h-96 mb-5">
						<Image
							src={product.imageUrl}
							fill
							alt={product.title}
							className="object-cover rounded-md bg-gradient-to-tr from-gray-100 to-gray-300"
						/>
					</div>
				) : (
					<div className="h-56 mb-5 bg-gradient-to-tr from-gray-100 to-gray-300 rounded-md" />
				)}

				<div className="space-y-2">
					<strong>{product?.title}</strong>
					<h6 className="text-lg font-bold">
						${product?.price.toLocaleString('en-US')}
					</h6>
					<p className="flex items-center gap-x-2">
						<ClockIcon className="w-4 h-4 inline" /> {product?.duration} days
					</p>
					<p className="leading-relaxed">{product?.description}</p>
				</div>
			</section>

			{/* booking */}
			<div className="mt-8">
				<h2 className="text-lg font-bold mb-2.5">Book package</h2>
				{session ? (
					<Order productId={product?.id as number} />
				) : (
					<Link href="/login" className="text-xl font-bold mb-5 text-center">Login to book</Link>
				)}
			</div>
		</div>
	)
}
