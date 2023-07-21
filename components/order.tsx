'use client'

import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from './input-field'
import { useRouter } from 'next/navigation'
import { buttonVariants } from './ui/button'
import { twMerge } from 'tailwind-merge'

const validationSchema = Yup.object().shape({
	startDate: Yup.date().required(),
})

export default function Order(props: { productId: number }) {
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			startDate: '',
		},
		validationSchema,
		async onSubmit(values, { setSubmitting }) {
			try {
				setSubmitting(true)

				const res = await axios.post('/api/orders', {
					...values,
					productId: props.productId,
				})

				if (res.status === 201) {
					setSubmitting(false)
					return router.push(`/checkout?id=${res.data.order?.id}`)
				}
			} catch (error) {
				setSubmitting(false)
				console.log(error)
			}
		},
	})
	

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="flex gap-x-2.5">
				<InputField
					label="From"
					type="date"
					value={formik.values.startDate}
					onChange={formik.handleChange('startDate')}
					onBlur={formik.handleBlur('startDate')}
					error={
						formik.touched.startDate && formik.errors.startDate
							? formik.errors.startDate
							: ''
					}
				/>
				<input
					type="submit"
					className={twMerge(buttonVariants(), 'mt-auto')}
					value={formik.isSubmitting ? 'Please wait...' : 'Continue'}
				/>
			</form>
		</div>
	)
}
