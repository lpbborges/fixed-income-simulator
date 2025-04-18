"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import type { SimulationFormData } from "@/lib/types";
import { simulationFormSchema } from "@/lib/schemas";
import { SimulationResults } from "./simulation-results";
import { useIndexersData } from "@/hooks/use-indexers-data";
import { useSimulation } from "@/hooks/use-simulation";
import { SimulationForm } from "./simulation-form";
import { useRef } from "react";

const defaultValues: SimulationFormData = {
	initialInvestment: "",
	months: 0,
	monthlyInvestment: "",
	investments: [],
};

export function FixedIncomeSimulator() {
	const resultsRef = useRef<HTMLTableElement>(null);
	const { error, indexersData, isLoading } = useIndexersData();

	const form = useForm<SimulationFormData>({
		resolver: zodResolver(simulationFormSchema),
		defaultValues,
	});

	const { simulate, result } = useSimulation();

	const onSubmit = (data: SimulationFormData) => {
		simulate(data, indexersData, resultsRef);
	};

	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Simulador de Investimentos</CardTitle>
					<CardDescription>
						Calcule o rendimento do seu investimento em renda fixa ao longo do
						tempo
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SimulationForm
						isFetchingIndexers={isLoading}
						fetchIndexersError={error}
						indexersData={indexersData}
						form={form}
						onSubmit={onSubmit}
					/>
				</CardContent>
			</Card>
			{result && result?.investmentsYields?.length > 0 && (
				<SimulationResults ref={resultsRef} result={result} />
			)}
		</div>
	);
}
