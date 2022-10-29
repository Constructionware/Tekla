#!/usr/bin/python
# -*- coding: utf-8 -*-
import codecs
import os
import sys
from shutil import rmtree
from setuptools import (find_packages, setup, Command)

home = os.path.abspath(os.path.dirname(__file__))

with codecs.open(os.path.join(home, "README.md"), encoding="utf-8") as f:
	long_description = "\n" + f.read()
	
about = {}

with open(os.path.join(home, "sledge", "__version__.py")) as f:
	exec(f.read(), about)
	
if sys.argv[-1] == "publish":
	os.system("python setup.py sdist bdist_wheel upload")
	sys.exit()
	
required = [
	"starlette",
	"cryptography",
	"jinja2",
	"requests",
	"StringGenerator",
	"ujson",
	"uvicorn",
	"whitenoise"
]

class DebCommand(Command):
    """Support for setup.py deb"""

    description = "Build and publish the .deb package."
    user_options = []

    @staticmethod
    def status(s):
        """Prints things in bold."""
        print("\033[1m{0}\033[0m".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        try:
            self.status("Removing previous builds…")
            rmtree(os.path.join(home, "deb_dist"))
        except FileNotFoundError:
            pass
        self.status(u"Creating debian manifest…")
        os.system(
            "python setup.py --command-packages=stdeb.command sdist_dsc -z artful --package3=pipenv --depends3=python3-virtualenv-clone"
        )
        self.status(u"Building .deb…")
        os.chdir("deb_dist/pipenv-{0}".format(about["__version__"]))
        os.system("dpkg-buildpackage -rfakeroot -uc -us")


class UploadCommand(Command):
    """Support setup.py publish."""

    description = "Build and publish the package."
    user_options = []

    @staticmethod
    def status(s):
        """Prints things in bold."""
        print("\033[1m{0}\033[0m".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        try:
            self.status("Removing previous builds…")
            rmtree(os.path.join(home, "dist"))
        except FileNotFoundError:
            pass
        self.status("Building Source distribution…")
        os.system("{0} setup.py sdist bdist_wheel".format(sys.executable))
        self.status("Uploading the package to PyPI via Twine…")
        os.system("twine upload dist/*")
        self.status("Pushing git tags…")
        os.system("git tag v{0}".format(about["__version__"]))
        os.system("git push --tags")
        sys.exit()


setup(
    name="sledge",
    version=about["__version__"],
    description="Constructionware Building Construction works manager. Built for the Construction Industry!.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Ian Moncrieffe",
    author_email="csware.ware@gmail.com",
    url="https://github.com/Constructionware/sledge",
    packages=find_packages(exclude=["tests"]),
    entry_points={"console_scripts": ["sledge=sledge.cli:cli"]},
    package_data={"sledge": ["py.typed"]},
    python_requires=">=3.10",
    setup_requires=[],
    install_requires=required,
    extras_require={},
    include_package_data=True,
    license="MIT",
    classifiers=[
        "License :: OSI Approved :: MIT Software License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: Implementation :: CPython",
        "Programming Language :: Python :: Implementation :: PyPy",
    ],
    cmdclass={"upload": UploadCommand, "deb": DebCommand},
)
	
