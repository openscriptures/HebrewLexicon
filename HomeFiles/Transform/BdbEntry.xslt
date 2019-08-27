<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:oshb="http://openscriptures.github.com/morphhb/namespace"
				xmlns="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" omit-xml-declaration="yes" indent="yes"/>

	<xsl:template match="/">
		<xsl:apply-templates select="oshb:lexicon/oshb:entry"/>
	</xsl:template>

	<xsl:template match="oshb:entry">
        <xsl:element name="p">
			<xsl:if test="@type"><xsl:attribute name="class">root</xsl:attribute></xsl:if>
			<xsl:if test="@cite"><xsl:text>&#8224;</xsl:text>&#160;</xsl:if>
			<xsl:if test="@mod"><xsl:value-of select="@mod"/>&#160;</xsl:if>
			<xsl:apply-templates/>
        </xsl:element>
	</xsl:template>
	
	<xsl:template match="oshb:w">
		<span class="Hebrew"><xsl:value-of select="."/></span>&#8206;</xsl:template>
	
	<xsl:template match="oshb:pos">
		<span class="pos"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:def">
		<span class="def"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:em">
		<em><xsl:value-of select="."/></em>
	</xsl:template>
	
	<xsl:template match="oshb:stem">
		<span class="stem"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:asp">
		<span class="asp"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:sense">		
		<span class="sense">
			<xsl:if test="@n"><xsl:value-of select="@n"/>.&#160;</xsl:if>
			<xsl:apply-templates/>
		</span>
	</xsl:template>

	<xsl:template match="oshb:status">
		<xsl:text>Page </xsl:text><xsl:value-of select="@p"/>,
		<xsl:text>Status: </xsl:text><xsl:value-of select="."/>.
	</xsl:template>

	<xsl:template match="oshb:ref">
		<xsl:variable name="r"><xsl:value-of select="@r"/></xsl:variable>
		<span class="ref" title="{$r}"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:foreign">
		<span class="foreign"><xsl:value-of select="."/></span>
	</xsl:template>
	
</xsl:stylesheet>