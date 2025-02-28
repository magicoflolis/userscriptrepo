import { PathLike } from 'node:fs';

/**
 * Loads all the structures in the provided directory.
 *
 * @param dir - The directory to load the structures from
 * @param recursive - Whether to recursively load the structures in the directory
 * @returns
 */
async function loadLanguages<T>(dir: PathLike, recursive: boolean = true): Promise<T[]>;
export { loadLanguages };
export default loadLanguages;
