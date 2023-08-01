'use client'
import React from "react";
import { Spacer } from "../components/spacer"
import * as Form from '@radix-ui/react-form';
import { twMerge } from "tailwind-merge";

export default function Copeve() {
	return (
		<main className="w-full">
			<h1 className="text-5xl mb-10">Contato</h1>

			<Form.Root className="flex flex-col gap-y-1 px-8">
				<FormField
					name="nome"
					label="Nome"
					type="text"
					required
					errors={[{
						id: 'error_nome',
						match: 'valueMissing',
						message: 'Por favor, preencha o campo "Nome"'
					}]}
				/>

				<FormField
					name="email"
					label="Email"
					type="email"
					required
					errors={[{
						id: 'error_email',
						match: 'valueMissing',
						message: 'Por favor, preencha o campo "Email"'
					}]}
				/>

				<FormField
					name="assunto"
					label="Assunto"
					type="text"
					required
					errors={[{
						id: 'error_subject',
						match: 'valueMissing',
						message: 'Por favor, preencha o campo "Assunto"'
					}]}
				/>

				<FormField
					name="mensagem"
					label="Mensagem"
					type="text"
					elementType="textarea"
					className="min-h-[200px]"
					required
					errors={[{
						id: 'error_message',
						match: 'valueMissing',
						message: 'Por favor, preencha o campo "Mensagem"'
					}]}
				/>


				<Form.Submit asChild>
					<button className="bg-primary text-white py-2 px-7 w-min text-lg font-semibold mt-2 mx-auto mouse-over">
						Enviar
					</button>
				</Form.Submit>
			</Form.Root>

			<Spacer />
		</main>
	);
}

type FormFieldProps = {
	name: string;
	label: string;
	type: string;
	elementType?: string;
	className?: string;
	required?: boolean;
	errors?: {
		id: string;
		match: Form.FormMessageProps['match'],
		message: string;
	}[];
}

function FormField({ name, label, type, elementType = 'input', className, required, errors }: FormFieldProps) {
	return (
		<Form.Field className={'flex flex-col relative'} name={name}>
			<Form.Label className="text-lg">{label}</Form.Label>
			<Form.Control asChild>
				{
					React.createElement(elementType, {
						className: twMerge("border data-[invalid]:border-red-500 mb-6 h-10 w-full rounded-md py-2 px-4", className),
						type,
						required
					})
				}
			</Form.Control>
			{
				errors?.map(error => (
					<Form.Message key={error.id} className="text-sm text-red-500 absolute bottom-0" match={error.match}>
						{error.message}
					</Form.Message>
				))
			}
		</Form.Field>
	)
}