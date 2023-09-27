#This code converts a .xpm into a .js for use in my platformer

import sys

infile = open(sys.argv[1]+'.xpm')
outfile = open(sys.argv[1]+'.js','w') 

#read in height and width by chopping up line 3 in the infile
infile.readline()
infile.readline()
info_string = infile.readline()
info_string = info_string[1:len(info_string)-3]

width = int(info_string[0:info_string.find(" ")])
info_string = info_string[info_string.find(" ")+1:len(info_string)]
height = int(info_string[0:info_string.find(" ")])
info_string = info_string[info_string.find(" ")+1:len(info_string)]
palette_size = int(info_string[0:info_string.find(" ")])

#move the readlines past the palette part into the actual data
for i in range(0,palette_size):  
	infile.readline()

#write the js header
outfile.write("//	Map file for my platformer	-mhwinder\n\n")
outfile.write(sys.argv[1]+" = new Object();\n")
outfile.write(sys.argv[1]+".height = "+str(height)+";\n")
outfile.write(sys.argv[1]+".width = "+str(width)+";\n")
outfile.write("var myData = [];\n")
outfile.write(sys.argv[1]+".data = myData;\n")

#writes out all the map data in a loop
for i in range(0,height):
	mapDataString = infile.readline()
	outfile.write(sys.argv[1]+".data["+str(i)+"] = "+mapDataString[0:len(mapDataString)-2]+";\n")

print "Wrote file: "+sys.argv[1]+'.js'












