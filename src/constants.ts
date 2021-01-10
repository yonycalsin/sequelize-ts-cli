import path from 'path';

export const projectPackageJsonFileName = 'package.json';

export const projectPackageJsonFilePath = path.resolve(
   projectPackageJsonFileName,
);

export const packageJsonFileName = 'package.json';

export const packageJsonFilePath = path.resolve(
   __dirname,
   '..',
   packageJsonFileName,
);
