export class CommandResultDto {
    exitCode!: number;

    stdout!: string;

    stderr!: string;

    executionTimeMs!: number;
}