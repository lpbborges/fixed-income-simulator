import type { SimulationResult } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import type { RefObject } from "react";

interface SimulationResultsProps {
	result: SimulationResult;
	ref: RefObject<HTMLTableElement | null>;
}

export function SimulationResults({ result, ref }: SimulationResultsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Resultado da última simulação</CardTitle>
				<CardDescription>{result.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Table ref={ref}>
					<TableHeader>
						<TableRow>
							<TableHead>Investimento</TableHead>
							<TableHead className="text-center">Valor total bruto</TableHead>
							<TableHead className="text-center">Valor total líquido</TableHead>
							<TableHead className="text-center">Rendimento líquido</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.investmentsYields.map((simulation) => (
							<TableRow key={simulation.description}>
								<TableCell>{simulation.description}</TableCell>
								<TableCell className="text-center">
									{formatCurrency(simulation.totalGrossAmount)}
								</TableCell>
								<TableCell className="text-center">
									{formatCurrency(simulation.totalNetAmount)}
								</TableCell>
								<TableCell className="text-center">
									{formatCurrency(simulation.totalNetIncome)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
