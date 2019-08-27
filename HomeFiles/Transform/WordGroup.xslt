<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:oshb="http://openscriptures.github.com/morphhb/namespace"
				xmlns="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" omit-xml-declaration="yes" indent="yes"/>
	
	<xsl:param name="selectedId"/>

	<xsl:template match="/">
		<section id="li" class="part">
			<xsl:apply-templates select="oshb:index/oshb:entry"/>
        </section>
	</xsl:template>

	<xsl:template match="oshb:entry">
		<xsl:variable name="id"><xsl:value-of select="@id"/></xsl:variable>
		<xsl:choose>
			<xsl:when test="$id = $selectedId">
				<div class="entry">
					<input type="radio" name="group" id="{$id}" checked="checked" onclick="wordGroup.select('{@id}')" />
					<xsl:apply-templates/>
				</div>
			</xsl:when>
			<xsl:otherwise>
				<div class="entry">
					<input type="radio" name="group" id="{$id}" onclick="wordGroup.select('{@id}')" />
					<xsl:apply-templates/>
				</div>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="oshb:w">
		<span class="Hebrew">
			<xsl:apply-templates/>
        </span>
		<xsl:text>&#8194;</xsl:text>
		<span class="xlit">
			<xsl:value-of select="./@xlit" />
        </span>
	</xsl:template>
	
	<xsl:template match="oshb:pos">
		<xsl:text>&#8194;</xsl:text>
		<span class="pos">
			<xsl:apply-templates/>
        </span>
	</xsl:template>
	
	<xsl:template match="oshb:def">
		<xsl:text>&#8194;</xsl:text>
		<span class="def">
			<xsl:apply-templates/>
        </span>
	</xsl:template>
	
	<xsl:template match="oshb:xref"></xsl:template>
	
	<xsl:template match="oshb:etym">
		<xsl:text>&#8194;</xsl:text>
		<xsl:if test="@root">
			<xsl:text> Root: </xsl:text>
			<span class="Hebrew">
				<xsl:value-of select="./@root" />
			</span>
		</xsl:if>
	</xsl:template>
	
</xsl:stylesheet>